import { ChildComponent } from '@/core/components/child.component'
import { renderService } from '@/core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import styles from './statistic-item.module.scss'
import template from './statistic-item.template.html'

export class StatisticItem extends ChildComponent {
	/** Constructs a StatisticItem instance.
	 * @param {string} Label - The label to be displayed in the statistic item.
	 * @param {string|number} value - The value to be displayed in the
	 * statistic item.
	 * @param {('purple'|'green')} variant - The variant that determines *appearance of the statistic item. Allowed values: 'purple' or 'green'.
	 */
	constructor(label, value, variant) {
		super()

		if (!label || !value || !variant) {
			throw new Error('Label, value and variant (purple, green) required!')
		}

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).addClass(styles[this.variant]).addClass('fade-in')
		$R(this.element).find('#statistic-label').text(this.label)
		$R(this.element).find('#statistic-value').text(this.value)

		return this.element
	}
}
