/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
/* jscs:disable maximumLineLength */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const auth = {
  cookies: { secret: process.env.COOKIE_SECRET || 'fc5jw-svdn(m*u!n0p9@matsaele@3in%-%m7=n=s=6vh(#35n' },
  jwt: { secret: process.env.JWT_SECRET || 'q=7#7qp8+_p4g567qhe4l42!-hui-18$lklgw1^tcf#99kr6j@' },
};
