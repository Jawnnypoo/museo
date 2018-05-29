import * as electron from 'electron';
import { remote } from 'electron';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import * as fs from 'fs'
import * as Path from 'path';

const app = remote.app;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;
const wallpaper = require('wallpaper');

function hello() {
	axios.get("http://muzeiapi.appspot.com/featured?cachebust=1")
		.then(response => {
			console.log(response.data)
			return response.data.imageUri
		})
		.then(url => {
			return axios({
				method: 'get',
				url: url,
				responseType: 'arraybuffer'
			})
		})
		.then(response => {
			const path = app.getPath('temp') + '/wallpaper.jpg' 
			fs.writeFileSync(path, response.data)
			return wallpaper.set(path)
		})
		.catch(err => {
			console.log(err)
		})

}

document.getElementById('buttonSet').onclick = hello;