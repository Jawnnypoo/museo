import * as electron from 'electron';
import { remote } from 'electron';
import axios from 'axios';
import * as fs from 'fs'
import * as http from 'http';
import * as Path from 'path';

const app = remote.app;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;
const wallpaper = require('wallpaper');

function hello() {
	axios.get("http://muzeiapi.appspot.com/featured?cachebust=1")
		.then(response => {
			return response.data.imageUri
		})
		.then(url => {
			const path = app.getPath('desktop') + '/wallpaper.jpg'
			const file = fs.createWriteStream(path);
			http.get(url, function (response) {
				response.pipe(file);
				wallpaper.set(path)
					.then(() => {
						console.log('we did it')
					})
					.catch((err: any) => {
						console.log(err)
					})
			});
		})
		.catch(err => {
			console.log(err)
		})

}

document.getElementById('buttonSet').onclick = hello;