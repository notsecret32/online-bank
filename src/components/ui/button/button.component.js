import { ChildComponent } from '@/core/components/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import { renderService } from '@/core/services/render.service'

import styles from './button.module.scss'
import template from './button.template.html'

export class Button extends ChildComponent {
	/**
	 * @param {Object} options - Parameter Object.
	 * @param {any} options.children - The element that will be added to the inside of the button.
	 * @param {function} options.onClick - Callback-a function for pressing a button.
	 * @param {('green'|'purple')} options.variant - Button design option.
	 */
	constructor({ children, onClick, variant }) {
		super()

		if (!children) throw new Error('Children is empty!')
		this.children = children
		this.onClick = onClick
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).html(this.children).click(this.onClick)

		if (this.variant) {
			$R(this.element).addClass(styles[this.variant])
		}

		return this.element
	}
}
