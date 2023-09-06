import { apiQuery } from '@/core/api-query/api-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return apiQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}
