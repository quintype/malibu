---
title: Quay
parent: Deployment and Release management
grand_parent: Malibu Tutorial
nav_order: 02
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

Quay is used to provide a scalable and secure container registry platform on top of any supported on- and off-premise infrastructure. It provides massive performance in container image distribution, combined with the ability to scan container image contents for security vulnerabilities, while providing strict multi-tenancy. 

For more details about quay you can go through the [quay documentation](https://docs.quay.io/solution/getting-started.html).

After pushing your changes to GitHub you need to wait till the docker build finished, you check your docker build in the quay.

1. Login to [quay](https://quay.io).
2. Once you logged in you will see all the repository list inside the quay - internally the docker file will run.
3. Click on the required repository, in our case click on `malibu`.

You may now proceed to [Black-night]({{"/tutorial/quay.html" | absolute_url}}) to deploy your branch on cloud or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).