using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using customer.Models;

namespace customer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
       private readonly HttpClient _httpClient;

       public  CustomerController (HttpClient httpClient){
           _httpClient = httpClient;
       }
       [HttpGet]
       [Route ("getcustomers")]
       public async Task<ActionResult> GetCustomers(){
           
           var url = "https://localhost:44353/Customer/";
           var res = await _httpClient.GetAsync(url);
           res.EnsureSuccessStatusCode();
           return Ok(await res.Content.ReadAsStringAsync());
       }
        [HttpPost]
        [Route("AddCustomer")]
        public async Task<ActionResult> AddCustomer([FromBody] dynamic data)
        { 
             var dataObj = new
                {
                    Email = data.email,
                    Phone = data.phone,
                    CustomerName = data.customername,
                    Id = data.comments,
                };
            var url = "https://localhost:44353/Customer";
            var stringContent = new StringContent(JsonConvert.SerializeObject(dataObj), Encoding.UTF8, "application/json");
            var res = await _httpClient.PostAsync(url,stringContent);
            res.EnsureSuccessStatusCode();
            return Ok(await res.Content.ReadAsStringAsync());
        }
        [HttpPut]
        [Route("UpdatedCustomer")]
        public async Task<ActionResult> UpdatedCustomer( string id,[FromBody] dynamic data)
        { 
              
            var url = "https://localhost:44353/Customer/"+id;
            var stringContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            var res = await _httpClient.PutAsync(url,stringContent);
            res.EnsureSuccessStatusCode();
            return Ok(await res.Content.ReadAsStringAsync());
        }
        [HttpDelete]
        [Route("DeleteCustomer")]
        public async Task<ActionResult> DeleteCustomer( [FromBody] dynamic data)
        { 
              
            var url = "https://localhost:44353/Customer/";
            var stringContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            var res = await _httpClient.DeleteAsync(url);
            res.EnsureSuccessStatusCode();
            return Ok(await res.Content.ReadAsStringAsync());
        }

    }
}
