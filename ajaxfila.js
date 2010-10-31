<!--
// Criado por JALEX em novembro/2007 baseaso no exemplo do "Elcio Ferreira * Tableless.com.br"
// VERSAO: 1.0
// contato: jalex1979@yahoo.com.br / jalex79@gmail.com
var arrAjaxFila=[];				//Fila de requisições AJAX
var strFila_carregando='<span class="lblCarregando">Carregando...</span>';
function ajax()		//Carrega via AJAX a url recebida e coloca seu valor no objeto com o id recebido
{	if(arguments.length<2) return false;
	switch(typeof arguments[1])
	{	case 'string':
			$(arguments[1]).innerHTML=strFila_carregando;
			arrAjaxFila.push([1,arguments[0],arguments[1],arguments[2]]);
		break;
		case 'function':
			arrAjaxFila.push([0,arguments[0],arguments[1],arguments[2],arguments[3]]);
			if(typeof arrAjaxFila[0][4]=='string')$(arrAjaxFila[0][4]).innerHTML=strFila_carregando;
		break;
		default:alert('ERROR: mal uso da função');
	}
	if(arrAjaxFila.length==1) _ajaxRun();		//Se não há conexões pendentes, executa o próximo da fila
}
function _ajaxRun()
{	if(arrAjaxFila[0][0])
		new Ajax.Updater(	arrAjaxFila[0][2],
							arrAjaxFila[0][1],
							{	parameters:arrAjaxFila[0][3],
								onComplete:pFila_requisicaoTerminada,
								onFailure:pAjax_insucesso
							}
						);
	else
		new Ajax.Request(	arrAjaxFila[0][1],
							{	parameters:arrAjaxFila[0][3],
								onComplete:pFila_requisicaoTerminada,
								onSuccess:arrAjaxFila[0][2],
								onFailure:pAjax_insucesso
							}
		);
}
function pFila_requisicaoTerminada()
{	if(typeof arrAjaxFila[0][4]=='string')$(arrAjaxFila[0][4]).innerHTML='';
	arrAjaxFila.shift();
	if(arrAjaxFila.length>0)setTimeout('_ajaxRun()',5);
}
function pAjax_insucesso(){alert('Não possível resgatar informações.');}
-->