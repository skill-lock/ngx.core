const EXTERNAL_URL_REGEX = /(http|https|\/\/)/i;

/**
 * Determines whether the url is external or internal url. e.g. http/s.
 *
 * @export
 * @param {string} url url to check whether is external or not.
 * @returns {boolean}
 */
export function isExternalUrl(url: string): boolean {
	return EXTERNAL_URL_REGEX.test(url);
}