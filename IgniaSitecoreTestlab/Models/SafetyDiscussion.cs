using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IgniaSitecoreTestlab.Models
{
    public class SafetyDiscussion
    {
        public string ID { get; set; }
        public string Date { get; set; }
        public string Subject { get; set; }
        public string Location { get; set; }
        public string Colleague { get; set; }
        public string Outcomes { get; set; }
    }
}