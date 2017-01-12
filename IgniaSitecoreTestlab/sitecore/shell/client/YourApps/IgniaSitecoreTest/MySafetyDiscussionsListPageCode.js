define(["sitecore", "jquery"], function (Sitecore, jQuery) {
    var MySafetyDiscussionsListPage = Sitecore.Definitions.App.extend({
 
        initialized: function ()
        {
            
        },
        add: function()
        {
            location.href = "/sitecore/client/Your%20Apps/IgniaSitecoreTest/AddEditSafetyDiscussion";
        }
    });
    return MySafetyDiscussionsListPage;
});