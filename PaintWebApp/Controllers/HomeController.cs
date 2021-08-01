using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PaintWebApp.Models;
using PaintWebApp.Models.Objects;

namespace PaintWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly PaintDbContext _db;

        public HomeController(ILogger<HomeController> logger, PaintDbContext db)
        {
            _logger = logger;
            this._db = db;
        }

        public IActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult CreateText(TextObj model)
        {
            _db.Texts.Add(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult DeleteText(TextObj model)
        {
            _db.Texts.Remove(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult UpdateText(TextObj model)
        {
            _db.Texts.Update(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult CreateCurve(CurveObj model)
        {
            _db.Curves.Add(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult DeleteCurve(CurveObj model)
        {
            _db.Curves.Remove(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult UpdateCurve(CurveObj model)
        {
            _db.Curves.Update(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult CreateNote(NoteObj model)
        {
            _db.Notes.Add(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult DeleteNote(NoteObj model)
        {
            _db.Notes.Remove(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpPost]
        public ActionResult UpdateNote(NoteObj model)
        {
            _db.Notes.Update(model);
            _db.SaveChanges();

            return Json(new {success = true});
        }
        
        [HttpGet]
        public List<TextObj> GetTexts()
        {
            return _db.Texts.ToList();
        }
        [HttpGet]
        public List<CurveObj> GetCurves()
        {
            return _db.Curves.ToList();
        }
        [HttpGet]
        public List<NoteObj> GetNotes()
        {
            return _db.Notes.ToList();
        }
    }
}