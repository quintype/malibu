---
title: Manage Code With Github
parent: Deployment and Release management
grand_parent: Malibu Tutorial
nav_order: 01
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

Quintype manages all the products and libraries on Github, you can check it out all the repository [here](http://github.com/quintype) or you may contact support [support@quintype.com](mailto:support@quintype.com) to get Github access in case if you don't have. 

In this tutorial we will see how we can take the repository in local system from Github and will do some changes and pushed it back to Github.

## Cloning Malibu Github reppository to local system

1. We usuall follow folder structure something like `work/qt/` and then all the repository inside this folder.
2. Once you create folder structure now you need to clone the repo -   `git clone https://github.com/quintype/malibu.git`.

## Update files locally in Malibu
1. Once you cloned the repository go to `malibu` folder using `cd malibu`.
2. Create `test` branch - `git checkout -b test` or you can swithc to different branch using - `git checkout branch_name`.
2. Let's edit `story.js` file and add one console there.

## Pushing code back to Github

Once you are done with your local changes now time to push your changes to Github. But befor pushing changes to Github you may follow few steps.

1. Check all changed/updated files - `git status`
2. Add individual files  - `git add file_path` or you can check all the chages using - `git add -p` or add all the files that are updated using `git add .` .
3. Once you have added file to origin now time to commit your changes with message - `git commit -m "your changed message"`
4. Now time to push your changes to Github - `git push origin test`.