import { ChildComponent } from '@/core/components/child.component'
import { renderService } from '@/core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import { Store } from '@/core/store/store'
import styles from './logout-button.module.scss'
import template from './logout-button.template.html'

export class LogoutButton extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.user = this.store.state.user

		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element)
			.find('button')
			.click(() => {
				this.store.logout()
				this.router.navigate('/auth')
			})

		return this.element
	}
}
