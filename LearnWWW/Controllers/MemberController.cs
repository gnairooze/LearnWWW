using LearnWWW.Repository;
using LearnWWW.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearnWWW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : Controller
    {
        private readonly IRepository _repository;

        public MemberController(IRepository repository)
        {
            _repository = repository;
        }
        // GET: api/<DataController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> MemberList()
        {
            return await _repository.SelectAll<Member>();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(long id)
        {
            var model = await _repository.SelectById<Member>(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(long id, Member model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            await _repository.UpdateAsync<Member>(model);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Member>> InsertMember([FromBody] Member model)
        {
            await _repository.CreateAsync<Member>(model);
            return CreatedAtAction("GetMember", new { id = model.Id }, model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Member>> DeleteMember(long id)
        {
            var model = await _repository.SelectById<Member>(id);

            if (model == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync<Member>(model);

            return model;
        }
    }
}
