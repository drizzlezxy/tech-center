import Util from "extend/common/Util";
import RequestUtil from "extend/common/RequestUtil";
import 'scss/base.scss';
import 'scss/HomePage/index.scss';

$('#progressBar .progress-bar').text();

function doRender() {
	console.log('webpack success')
}

setTimeout(doRender, 16);