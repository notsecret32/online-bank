import { COLORS } from '@/config/color.config'

class ValidationService {
	constructor() {
		this.errorBorderTimeout = {}
	}

	showError(element, timeout = 2500) {
		element.css('border-color', COLORS.error)

		if (this.errorBorderTimeout[element]) {
			clearTimeout(this.errorBorderTimeout[element])
		}

		this.errorBorderTimeout[element] = setTimeout(() => {
			element.css('border-color', '')
		}, timeout)
	}
}

export const validationService = new ValidationService()
