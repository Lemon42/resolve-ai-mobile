export default async function SignIn() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(
				{
					token: 'digjsokghidfh89h48fdh8dasgsdgiq',
					user: {
						name: 'Everton',
						lastName: 'Dias',
					},
				},
				1500,
			);
		});
	});
}
