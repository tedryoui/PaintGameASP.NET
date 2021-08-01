namespace PaintWebApp.Models.Objects
{
    public class NoteObj
    {
        public int Id { get; set; }
        public string Position { get; set; }
        public string Offsets { get; set; }
        public string Sizes { get; set; }
        public bool IsDrawed { get; set; }
        public string TextString { get; set; }
    }
}