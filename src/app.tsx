import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { sendNotification, isPermissionGranted, requestPermission } from '@tauri-apps/api/notification'

import './app.css'
import {Box, Button, Center, useToast} from "@chakra-ui/react";

interface CustomResponse {
	message: string
}

export function App(): React.ReactElement {
	const [rustMsg, setRustMsg] = useState('');
	const toast = useToast();

	return (
		<>
			<Center>
			<Button mt={5} variant={"solid"} colorScheme={"blue"} onClick={() => {
				invoke('message_from_rust')
					.then((res: CustomResponse) => {
						setRustMsg(res.message);

						requestPermission().then(() => {});
						isPermissionGranted().then(() => sendNotification(res.message));

						// requestPermission().then(() => sendNotification(res.message));
						// sendNotification(res.message);
						// if (!isPermissionGranted().then(() => sendNotification(res.message))) {
						// 	requestPermission().then(() => sendNotification(res.message));
						// }

					})
					.catch(e => {
						console.error(e)
					})
			}}>Annoy me</Button>
			</Center>
		</>
	)
}