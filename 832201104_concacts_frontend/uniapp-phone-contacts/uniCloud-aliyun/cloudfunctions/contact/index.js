'use strict';
const db = uniCloud.database()
const contactTable = db.collection('contact')
exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ', event)
	let params = event.params || {}
	let res = {}
	switch (event.action) {
		case 'add': {
			res = await contactTable.add(params)
			break;
		}
		case 'list': {
			res = await contactTable.where({}).get()
			break;
		}
		case 'get': {
			res = await contactTable.where({
				'_id':params.id
			}).get();
			break;
		}
		case 'remove': {
			res = await contactTable.doc(params.id).remove();
			break;
		}
		case 'update': {
			res =await contactTable.doc(params._id).update({
				name: params.name,
				job: params.job,
				mobile: params.mobile,
				email: params.email
			});
			break;
		}
		default:
			res = {
				code: 404,
				msg: 'NOT_FOUND'
			}
			break;
	}
	return res
};
