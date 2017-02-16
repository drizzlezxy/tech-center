import Util from "extend/common/Util";
import RequestUtil from "extend/common/RequestUtil";
import 'scss/base.scss';
import 'scss/HomePage/index.scss';

class progressBar {
	constructor(props) {

		this.pgInit = 10;
		this.loader = setInterval(() => {
			this.pgInit += 10;
			this.setProgress(this.pgInit);
			if (this.pgInit >= 90) {
				clearInterval(this.loader);
			}
		}, 600);
	}

	setProgress(num = 50, cb = () => {}) {
		$('#progressBar .progress-bar').attr('style', 'width: ' + num + '%;')
			.find('.progress-value').text(num + '%');
		if (num >= 100) {
			setTimeout(() => {
				$('#progressBar').fadeOut();
				cb();
			}, 600);
		}
	}

}

var loadProgress = new progressBar();

window.onload = () => {
	setTimeout(() => {
		clearInterval(loadProgress.loader);
		loadProgress.setProgress(100, doRender);
	}, 2000)
}

function doRender() {
	console.log('webpack success')
}