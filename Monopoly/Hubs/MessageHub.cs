using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monopoly.Hubs
{
    public class MessageHub : Hub
    {
        public void onTransferOk()
        {
            Clients.All.updateMoneyData();
        }
    }
}