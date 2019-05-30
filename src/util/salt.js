/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

import md5 from './md5'

const SALT = '123*#Ui.524'

export default password => md5(SALT + password)
