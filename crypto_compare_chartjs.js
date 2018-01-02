$(document).ready(function(){
	$.ajax({
		// Crypto Compare GET URL (Just Swap The Following to get the chart for your currency)
		// Example: fsym=BTC | fsym=ETH | fsym=LTC
		url: 'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=6&aggregate=1&e=CCCAGG',
		method: 'GET',
		success: function(data){
			// Value
			var close = [];
			var open = [];
			var none = [];
			// Time
			var current_time;
			var date = [];
			var hours;
			var ampm;


			for (var i in data.Data){
				// console.log(data.Data[i].close);
				current_time = new Date(data.Data[i].time * 1000);
				hours = current_time.getHours();
				ampm =  hours >= 12 ? 'pm' : 'am'; 
				hours = hours % 12;
				hours = hours == 0 ? '12' : hours

				close.push(data.Data[i].close);
				open.push("Open: " + data.Data[i].open);
				date.push( hours + ' ' + ampm );
				none.push("");
			}

			var chartdata = {
				labels: date,
				datasets: [
					{
						label: "Bitcoin Value: ",
						backgroundColor: '#f69320',
						borderColor: '#f69320',
						hoverBackgroundColor: 'blue',
						hoverBorderColor: 'gray',
						data: close
					}
				]
			};

			// Specify Your Canvas ID
			var ctx = document.getElementById("btcchart");
			

			var lineGraph = new Chart(ctx,{
				type: 'line',
				data: chartdata,
				options: {
					scales:
			        {
			            xAxes: [{
			                display: true
			            }],
			            yAxes: [{
			            	display: true
			            }]
			        },
			        tooltips: {
			        	enabled: true,
			        	mode: 'y'
			        },
			        legend: {
			        	display: false
			        }
				}
			});		
		},
		error: function(data) {
			console.log('Error: ' + data);
		}
	})
})