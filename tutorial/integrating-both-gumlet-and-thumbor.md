---
title: Integrating Both Gumlet and Thumbor Together
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 08
---

# {{page.title}}

_This tutorial was contributed by [Shraddha Kesari](https://www.linkedin.com/in/shraddha-k-3a3548161/)_

[Thumbor]({{"/thumbor-integration" | absolute_url}})  and [Gumlet Integration]({{"/gumlet-integration" | absolute_url}})  can be used together to optimize and deliver images on the web. Thumbor is an open-source image manipulation server, while Gumlet is a cloud-based image optimization and delivery service. By combining both services, you can take advantage of Thumbor's powerful image manipulation capabilities and Gumlet's optimization and delivery infrastructure.

To integrate Thumbor and Gumlet, you can follow these steps:

## Install dependencies:

   - Ensure you have the necessary dependencies installed by running the following command in your Malibu project directory:
     ```js
     npm install thumbor-url-builder
     ```

## Create a Thumbor helper module:

   - Create a new file called `thumborHelper.js` in your project directory.
   - Inside `thumborHelper.js`, add the following code:

     ```js

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

## Update your Malibu application code:

   - Open your Malibu application's entry file *[app/server/app.js](https://github.com/quintype/malibu/blob/master/app/server/app.js)*
   - Add the following code at the beginning of the file to import the Thumbor helper:

     ```js
     const thumborHelper = require('./thumborHelper');
     ```

   - Modify your image route handler or middleware to integrate Thumbor and Gumlet.
   - Here's an example modification of an image route handler:

     ```js

     ...
     ...
     app.get('/images/:imageId', async (req, res) => {
       // Extract the image ID and other manipulation parameters from the request
       const { imageId, width, height } = req.params;

       // Construct the original image URL
       const imageUrl = `http://example.com/images/${imageId}`;

       // Build the Thumbor URL with desired manipulations
       const thumborUrl = thumborHelper.buildUrl(imageUrl, {
         width: parseInt(width),
         height: parseInt(height),
         fitIn: true,
       });

       try {
         // Make a request to Gumlet to fetch the optimized image
         const gumletResponse = await fetch(thumborUrl);

         // Set the appropriate content type and send the image as the response
         res.set('Content-Type', 'image/jpeg');
         gumletResponse.body.pipe(res);
       } catch (error) {
         console.error('Error fetching image from Gumlet:', error);
         res.status(500).send('Failed to fetch image');
       }
     });
     ...
     ...

     ```

     This example assumes that your original images are hosted at `http://example.com/images/`. Adjust this URL based on your actual image source.
     
     Note that in this example, the Thumbor URL is passed to Gumlet to fetch the optimized image. The response from Gumlet is then piped directly to the response object in Malibu.

Please note that you may need to make additional adjustments such as Authentication and security, Error handling, Request validation, Caching, Content types and response headers to the code based on your specific requirements and the structure of your Malibu application.

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}}).
