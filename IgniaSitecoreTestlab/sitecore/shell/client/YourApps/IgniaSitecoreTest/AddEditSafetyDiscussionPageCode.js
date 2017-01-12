define(["sitecore", "jquery"], function (Sitecore, jQuery) {
    var AddEditSafetyDiscussionPage = Sitecore.Definitions.App.extend({
 
        initialized: function ()
        {
            var id = this.getID();
             
            if (id != null)
            {
                console.log('ID processed');             
				this.getSafetyDiscussion(id);               
            }
        },
        getID: function()
        {
            var id = Sitecore.Helpers.url.getQueryParameters(window.location.href)['id'];
            if (Sitecore.Helpers.id.isId(id))
            {
                return id;
            }
        },
        getSafetyDiscussion: function(id)
        {			
            var app = this;
             
            jQuery.ajax({
                type: "GET",
                dataType: "json",
                url: "/api/sitecore/SafetyDiscussion/GetSafetyDiscussion",
                data: { 'id' : id },
                cache: false,
                success: function (data) {  
                    app.populateForm(data);
                },
                error: function() {
                  console.log("There was an error. Try again please!");
                }
            });
        },   
		populateForm: function(data)
        {
            var app = this;
 
			app.DiscussionDatePicker.set('date', data.Date);
            app.LocationTextBox.set('text', data.Location);
            app.SubjectTextBox.set('text', data.Subject);
			app.ColleagueTextArea.set('text', data.Colleague);
            app.OutcomesTextArea.set('text', data.Outcomes);
             
        },	
		saveSafetyDiscussion: function()
		{
			var app = this;
			
			app.SafetyDiscussionMessageBar.removeMessages();
			
			if(this.validateForm())
			{
				var id = app.getID();
							
				var safetyDiscussion = {
					date: app.DiscussionDatePicker.get('date'),
					location: app.LocationTextBox.get('text'),
					subject: app.SubjectTextBox.get('text'),
					colleague: app.ColleagueTextArea.get('text'),
					outcomes: app.OutcomesTextArea.get('text'),		
					id: id
					};
				 
				jQuery.ajax({
					type: "POST",
					url: "/api/sitecore/SafetyDiscussion/SaveSafetyDiscussion",
					data: { "safetyDiscussionData" : JSON.stringify(safetyDiscussion) },
					success: function (success) {   
						
						app.SafetyDiscussionMessageBar.addMessage("notification", {
							text: "Safety discussion saved successfully",
							actions: [],
							closable: true
						});
					},
					error: function() {         
					  
					  app.SafetyDiscussionMessageBar.addMessage("error", {
							text: "There was an error. Try again please!",
							actions: [],
							closable: true
						});
					}
				});
			}
					 
		},
		validateForm: function()
		{
			var app = this;
			var valid = true;
			
			if(app.DiscussionDatePicker.get('date') == null ||
				app.LocationTextBox.get('text') == '' ||
				app.SubjectTextBox.get('text') == '' ||
				app.ColleagueTextArea.get('text') == '' ||
				app.OutcomesTextArea.get('text') == '')
			{
				valid = false;
				
				 app.SafetyDiscussionMessageBar.addMessage("warning", {
						text: "All fields are mandatory. Try again please!",
						actions: [],
						closable: true
					});
				
				console.log('invalid');      
			}
			return valid;
		},
		back: function()
        {
            location.href = "/sitecore/client/Your%20Apps/IgniaSitecoreTest/MySafetyDiscussionsList";
        }
    });
    return AddEditSafetyDiscussionPage;
});