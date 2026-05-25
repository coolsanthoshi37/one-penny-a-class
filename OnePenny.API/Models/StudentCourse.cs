namespace OnePenny.API.Models
{
    public class StudentCourse
    {
        public int Id { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        // IMPORTANT: captures what user actually selected
        public int Quantity { get; set; }   // hours or sessions

        public decimal PriceAtPurchase { get; set; }

        public decimal FinalPriceAtPurchase { get; set; } // Final price after aid is applied

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    }
}
