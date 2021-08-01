using System.ComponentModel.DataAnnotations;

namespace PaintWebApp.Models.Objects
{
    public class TextObj
    {
        public int Id { get; set; }
        public string Position { get; set; }
        public string Offsets { get; set; }
        public string Bounds { get; set; }
        public string TextString { get; set; }
        public bool IsDrawed { get; set; }

    }
}