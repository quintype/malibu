---
title: Thumbor Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 07
---

# {{page.title}}

_This tutorial was contributed by [Shraddha Kesari](https://www.linkedin.com/in/shraddha-k-3a3548161/)_

Thumbor is an open-source image manipulation server. If you are using components like *[ResponsiveImage](https://developers.quintype.com/quintype-node-components/ResponsiveImage.html)*, *[ResponsiveHeroImage](https://developers.quintype.com/quintype-node-components/ResponsiveHeroImage.html)*, etc from [@quintype/components](https://developers.quintype.com/quintype-node-components) then by default Thumbor is being used as it pulls the image configuration from the redux store (which is populated from *[loadData](https://developers.quintype.com/malibu/isomorphic-rendering/server-side-architecture#loaddata)*).

If you aren't using any of the components from the library even then you can still integrate Thumbor to malibu. 

If you want to integrate Thumbor along with gumlet, check [this]({{"/integrating-both-gumlet-and-thumbor" | absolute_url}}) or if you want only Thumbor without using [Gumlet]({{"/gumlet-integration" | absolute_url}}), you can follow these steps to make the necessary modifications

## Install the required dependencies:

   - Make sure you have the necessary package installed by running the following command in your Malibu project directory:
     ```javascript
     npm install thumbor-url-builder
     ```

## Create a Thumbor helper module:

   - Create a new file called `thumborHelper.js` in your project directory.
   - Inside `thumborHelper.js`, add the following code:

     ```javascript
     const thumborUrlBuilder = require('thumbor-url-builder');

     const thumborHelper = {
       buildUrl: (imageUrl, options) => {
         const thumborKey = 'your_thumbor_security_key';
         const thumborServerUrl = 'http://thumbor-server.example.com';

         const thumbor = thumborUrlBuilder(thumborServerUrl, thumborKey);
         return thumbor.setImageUrl(imageUrl).setOptions(options).buildUrl();
       },
     };

     module.exports = thumborHelper;
     ```

     Replace `'your_thumbor_security_key'` with your actual Thumbor security key, and `'http://thumbor-server.example.com'` with the URL of your Thumbor server.

## Modify your Malibu application code:

   - Open your Malibu application's  entry file *[app/server/app.js](https://github.com/quintype/malibu/blob/master/app/server/app.js)*

## Import the Thumbor helper module:
   - Add the following code at the beginning of the file to import the Thumbor helper:

     ```javascript
     const thumborHelper = require('./thumborHelper');
     ```

## Update your image route handler or middleware:
   - Locate the relevant part of your Malibu code where the image route handler or middleware is defined.
   - Update the code to integrate Thumbor.

   Here's an example modification of an image route handler:

     ```javascript
     app.get('/images/:imageId', (req, res) => {
        // Extract the image ID and other manipulation parameters from the request
        const { imageId, width, height } = req.params;

        // Construct the Thumbor URL with desired manipulations
        const thumborUrl = `https://your-thumbor-cdn.com/images/${imageId}?width=${width}&height=${height}&fit-in=true`;

        // Redirect the client to the Thumbor URL
        res.redirect(thumborUrl);
      });

     ```

     In this example, `your-thumbor-cdn.com` represents the domain of your Thumbor CDN. Adjust it to match the actual domain of your Thumbor CDN.


By following these steps and modifying your code accordingly, your Malibu application will redirect the client to the Thumbor URLs provided by your image CDN(Thumbor), which will handle the image manipulations and optimizations.
Remember to replace the Thumbor security key and server URL in the `thumborHelper.js` file with your actual values.


## Updating Publisher Config

The final step is to ask Quintype to switch your image CDN over to Thumbor. This is done by writing to [support@quintype.com](mailto:support@quintype.com). This step will no longer be needed once the beta program is over. It is still safe to push the above steps to beta / production before switching the final CDN step.

Please note that you may need to make additional adjustments such as Authentication and security, Error handling, Request validation, Caching, Content types and response headers to the code based on your specific requirements and the structure of your Malibu application.

For more info check the *[original documention of Thumbor](https://thumbor.readthedocs.io/en/latest/installing.html)*

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}}).