import { ChildComponent } from '../components/child.component'

class RenderService {
	/**
	 * Transforms HTML code into an element, replacing components with html code, and styles with modular styles
	 * @param {string} html - HTML code of the page.
	 * @param {Array} components - An array of components that will be in the HTML code.
	 * @param {Object} [styles] - Styles that will be applied to the next page.
	 * @returns {HTMLElement}
	 */
	htmlToElement(html, components = [], styles) {
		const parser = new DOMParser()
		const doc = parser.parseFromString(html, 'text/html')
		const element = doc.body.firstChild

		if (styles) {
			this.#applyModuleStyles(styles, element)
		}

		this.#replaceComponentTags(element, components)

		return element
	}

	/**
	 * Replaces custom HTML tags (components) with HTML code.
	 * @param {HTMLElement} parentElement - The current page element (component in the form of an HTML page).
	 * @param {Array} components - Array of components.
	 */
	#replaceComponentTags(parentElement, components) {
		// The pattern by which the tags will be searched
		const componentTagPattern = /^component-/
		// Looking for all tags
		const allElements = parentElement.getElementsByTagName('*')

		// Iterating through each tag
		for (const element of allElements) {
			const elementTagName = element.tagName.toLowerCase()

			// If the tag fits, then we bring it to a single view
			if (componentTagPattern.test(elementTagName)) {
				const componentName = elementTagName
					.replace(componentTagPattern, '')
					.replace(/-/g, '')

				// Using the received tag, we are looking for a component
				const foundComponent = components.find(Component => {
					// We check whether this is an instance of the ChildComponent class or not
					const instance =
						Component instanceof ChildComponent ? Component : new Component()

					return instance.constructor.name.toLowerCase() === componentName
				})

				if (foundComponent) {
					// We check whether this is an instance of the ChildComponent class or not
					// If yes, then call the `render` method
					// If not, then create an instance and call the method
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()
							: new foundComponent().render()

					// Replacing the tag with a component (HTML code)
					element.replaceWith(componentContent)
				} else {
					console.error(
						`Component "${componentName}" not found in the provided components array.`
					)
				}
			}
		}
	}

	/**
	 * Replaces the regular element styles with modular styles.
	 * @param {Object} moduleStyles - Modular styles.
	 * @param {string} element - HTML elements.
	 * @returns {void}
	 */
	#applyModuleStyles(moduleStyles, element) {
		if (!element) return

		const applyStyles = element => {
			for (const [key, value] of Object.entries(moduleStyles)) {
				if (element.classList.contains(key)) {
					element.classList.remove(key)
					element.classList.add(value)
				}
			}
		}

		// Working with parent styles
		if (element.getAttribute('class')) {
			applyStyles(element)
		}

		// Working with styles of nested tags
		const elements = element.querySelectorAll('*')
		elements.forEach(applyStyles)
	}
}

export const renderService = new RenderService()
