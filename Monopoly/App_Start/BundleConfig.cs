using System.Web;
using System.Web.Optimization;

namespace Monopoly
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.Bundles.ResetAll();

            /// Bundles config JS
            /// Declaration Script Bundle : 01/07/2017

            ScriptBundle scriptJquery = new ScriptBundle("~/bundles/jquery");
            ScriptBundle scriptLibrary = new ScriptBundle("~/bundles/library");
            ScriptBundle scriptBootstrap = new ScriptBundle("~/bundles/bootstrap");
            ScriptBundle scriptCustom = new ScriptBundle("~/bundles/custom");

            //ScriptBundle ScriptCurrencyHelp = new ScriptBundle("~/bundles/cleave");

            ScriptBundle scriptKeyboard = new ScriptBundle("~/bundles/keyboard");
            ScriptBundle scriptMaterialize = new ScriptBundle("~/bundles/materialize");
            ScriptBundle scriptKeyboardClave = new ScriptBundle("~/bundles/keyboardClave");
            StyleBundle styleGeneralPage = new StyleBundle("~/Resources/Static/Css/General/style");

            StyleBundle styleSteptwo = new StyleBundle("~/Resources/css/styleLogin2");

            styleSteptwo.Include(
                "~/Resources/css/login/styleLogin2.css"
            );

            //ScriptCurrencyHelp.Include("~/Content/js/CurrencyHelp/cleave.min.js");

            scriptJquery.Include(
                "~/Resources/Static/Scripts/jQuery/*.js"
            );

            scriptBootstrap.Include(
                "~/Resources/Static/Scripts/Bootstrap/*.js"
            );

            scriptLibrary.Include(
                "~/Resources/Static/Scripts/Library/*.js"
              );


            scriptCustom.Include(
                "~/Resources/Static/Scripts/Custom/*.js"
            );

            scriptKeyboard.Include(
                 "~/Resources/Static/Scripts/Keyboard/*.js"
            );
            scriptKeyboardClave.Include(
                 "~/Resources/Static/Scripts/KeyboardClave/*.js"
            );

            scriptMaterialize.Include(
                 "~/Resources/Static/Scripts/Materialize/*.js"
            );

            styleGeneralPage.Include(
                "~/Resources/Static/Css/General/style.css"
            );

            //Add SignalR Js
            //scriptJquery.Include("~/Scripts/jquery.signalR-2.4.1.min.js");

            bundles.Add(scriptJquery);
            bundles.Add(scriptBootstrap);
            bundles.Add(scriptMaterialize);
            bundles.Add(scriptLibrary);
            bundles.Add(scriptCustom);
            bundles.Add(scriptKeyboard);
            bundles.Add(scriptKeyboardClave);
            bundles.Add(styleGeneralPage);
            bundles.Add(styleSteptwo);
            //bundles.Add(ScriptCurrencyHelp);


            ///Individual


            /// Bundles Js
            /// Declaration JS Blunde : 01/07/2017
            /// Layers

            bundles.Add(new ScriptBundle("~/bundles/Jquery_BoostStrap").Include(
                "~/Resources/Static/Scripts/jQuery/jquery.js",
                "~/Resources/Static/Scripts/Bootstrap/bootstrap.min.js"));


            bundles.Add(new ScriptBundle("~/bundles/ForgetCreate1").Include(
                "~/Resources/Static/Scripts/Library/creditcard.min.js",
                "~/Content/js/keyboard/keyboard2.js"));

            bundles.Add(new ScriptBundle("~/bundles/ForgetCreate1_Mobile").Include(
             "~/Resources/Static/Scripts/Library/creditcard.min.js",
             "~/Content/js/keyboard/keyboard2_mobile.js"));

            bundles.Add(new ScriptBundle("~/bundles/ForgetCreate2").Include(
               "~/Resources/Static/Scripts/Custom/library.js",
               "~/Resources/Static/Scripts/Library/image-picker.min.js",
               "~/Content/js/keyboard/keyboard3.js"));

            bundles.Add(new ScriptBundle("~/bundles/ForgetCreate2_Mobile").Include(
              "~/Resources/Static/Scripts/Custom/library.js",
              "~/Resources/Static/Scripts/Library/image-picker.min.js",
              "~/Content/js/keyboard/keyboard3_mobile.js"));


            ////
            bundles.Add(new ScriptBundle("~/bundles/LayoutApp").Include("~/Resources/Static/Scripts/Layers/Layout.app.js"));
            bundles.Add(new ScriptBundle("~/bundles/LayerMain").Include("~/Resources/Static/Scripts/Layers/Layout.main.js"));

            /// Views
            bundles.Add(new ScriptBundle("~/bundles/Login").Include("~/Resources/Static/Scripts/Layers/Views/login.app.js"));
            bundles.Add(new ScriptBundle("~/bundles/Messages").Include("~/Resources/Static/Scripts/Layers/Views/messages.app.js"));
            bundles.Add(new ScriptBundle("~/bundles/Transaction").Include("~/Resources/Static/Scripts/Layers/Views/transaction.app.js"));
            bundles.Add(new ScriptBundle("~/bundles/Material").Include("~/Resources/Static/Scripts/Layers/materialize.app.js"));

            // General 
            bundles.Add(new ScriptBundle("~/bundles/Layout").Include("~/Resources/Static/Scripts/Layers/General.js"));

            // Styles 
            bundles.Add(new StyleBundle("~/Resources/Static/Css/General/custom").Include("~/Resources/Static/Css/General/custom.css"));
            bundles.Add(new StyleBundle("~/Resources/Static/Css/General/mCustomScrollbar").Include("~/Resources/Static/Css/Extras/jquery.mCustomScrollbar.css"));
            bundles.Add(new StyleBundle("~/Resources/Static/Css/General/flipclock").Include("~/Resources/Static/Css/Extras/flipclock.css"));

            //Login styles 

            bundles.Add(new StyleBundle("~/Resources/css/login/styleLogin").Include("~/Resources/css/login/styleLogin.css"));

            bundles.Add(new StyleBundle("~/Resources/css/login/styleLoginMinified").Include("~/Resources/css/login/styleLoginMinified.css"));

            foreach (var b in bundles)
            {
                var context = new BundleContext(new HttpContextWrapper(HttpContext.Current), BundleTable.Bundles, b.Path);
                b.UpdateCache(context, b.GenerateBundleResponse(context));
            }

            BundleTable.EnableOptimizations = true;
        }
    }
}
