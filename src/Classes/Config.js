import _ from "lodash";
import manifest from "../Assets/manifest";

export default new class Config {
	data = {
		currentStates: {},
		background: manifest.background,
		presets: []
	};

	load() {
		this.data = _.extend(this.data, JSON.parse(localStorage.getItem("config")));
	}

	save() {
		localStorage.setItem("config", JSON.stringify(this.data));
	}

	getItem(path) {
		return _.get(this.data, path);
	}

	setItem(path, value) {
		_.set(this.data, path, value);
		this.save();
	}
}