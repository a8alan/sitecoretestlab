using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.SecurityModel;
using Sitecore.Web.UI.WebControls;
using IgniaSitecoreTestlab.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace IgniaSitecoreTestlab.Controllers
{
    public class SafetyDiscussionController : Controller
    {
        public ActionResult GetSafetyDiscussion(Guid id)
        {
            SafetyDiscussion safetyDiscussion = new SafetyDiscussion();

            if (ID.IsID(id.ToString()))
            {
                var db = Sitecore.Configuration.Factory.GetDatabase("master");

                if (db != null)
                {
                    var safetyDiscussionItem = db.GetItem(new ID(id));
                    
                    safetyDiscussion.Date = safetyDiscussionItem["Date"];
                    safetyDiscussion.Location = safetyDiscussionItem["Location"];
                    safetyDiscussion.Subject = safetyDiscussionItem["Subject"];
                    safetyDiscussion.Colleague = safetyDiscussionItem["Colleague"];
                    safetyDiscussion.Outcomes = safetyDiscussionItem["Outcomes"];
                    
                }
            }

            return Json(safetyDiscussion, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveSafetyDiscussion(string safetyDiscussionData)
        {
            var masterDB = Sitecore.Configuration.Factory.GetDatabase("master");

            JavaScriptSerializer jss = new JavaScriptSerializer();
            SafetyDiscussion safetyDiscussion = jss.Deserialize<SafetyDiscussion>(safetyDiscussionData);

            using (new SecurityDisabler())
            {
                if (!string.IsNullOrEmpty(safetyDiscussion.ID))
                {
                    Item item = masterDB.GetItem(new ID(safetyDiscussion.ID));

                    item.Editing.BeginEdit();

                    item.Fields["Date"].Value = safetyDiscussion.Date;
                    item.Fields["Location"].Value = safetyDiscussion.Location;
                    item.Fields["Subject"].Value = safetyDiscussion.Subject;
                    item.Fields["Colleague"].Value = safetyDiscussion.Colleague;
                    item.Fields["Outcomes"].Value = safetyDiscussion.Outcomes;

                    item.Editing.EndEdit();
                }
                else
                {
                    TemplateItem template = masterDB.GetItem("/sitecore/templates/IgniaTest/Safety Discussion");

                    Item parentItem = masterDB.GetItem("/sitecore/content/home/IgniaTest/Safety Discussions");

                    Item newItem = parentItem.Add(safetyDiscussion.Subject, template);

                    newItem.Editing.BeginEdit();

                    newItem.Fields["Date"].Value = safetyDiscussion.Date;
                    newItem.Fields["Location"].Value = safetyDiscussion.Location;
                    newItem.Fields["Subject"].Value = safetyDiscussion.Subject;
                    newItem.Fields["Colleague"].Value = safetyDiscussion.Colleague;
                    newItem.Fields["Outcomes"].Value = safetyDiscussion.Outcomes;
                                        
                    newItem.Editing.EndEdit();
                }
            }

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}