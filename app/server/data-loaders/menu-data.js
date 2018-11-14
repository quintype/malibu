import _ from "lodash";

exports.getNavigationMenuArray = function(menuList, sectionList) {
  _(menuList).forEach(menutItem => {
    menutItem.children = _(menuList)
      .filter(item => item["parent-id"] === menutItem.id)
      .value();
    switch (menutItem["item-type"]) {
      case "tag":
        menutItem.completeUrl = menutItem["tag-slug"]
          ? `/topic/${menutItem["tag-slug"]}`
          : "/#";
        break;
      case "link":
        menutItem.completeUrl = _.get(menutItem, ["data", "link"]) || "/#";
        menutItem.isExternalLink = true;
        break;
      case "section":
        menutItem.completeUrl = findCompleteUrl(menutItem, sectionList);
        break;
      default:
        menutItem.completeUrl = "/#";
        break;
    }
  });
  const menu = _(menuList)
    .filter(item => item["parent-id"] == null)
    .value();
  return {
    footerLinks: menu.filter(item => item["menu-group-slug"] === "footerLinks"),
    default: menu.filter(item => item["menu-group-slug"] === "default")
  };
};

function findCompleteUrl(menutItem, sectionList) {
  const sectionObject = _.find(sectionList, function(item) {
    return item.id === menutItem["item-id"];
  });
  if (!sectionObject) {
    return "/#";
  }
  if (sectionObject["parent-id"]) {
    const parentSectionObj = _.find(sectionList, function(item) {
      return sectionObject["parent-id"] === item.id;
    });
    return parentSectionObj
      ? "/" + parentSectionObj.slug + "/" + sectionObject.slug
      : "/#";
  }
  return "/" + sectionObject.slug || "/#";
}
