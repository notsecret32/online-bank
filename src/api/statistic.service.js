import { apiQuery } from '@/core/api-query/api-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return apiQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
