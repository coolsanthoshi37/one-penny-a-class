namespace OnePenny.API.DTOs
{
    public class CourseEnrollmentDto
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;

        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; }

         public decimal? FinalPrice { get; set; }       // AFTER AID (NEW)
    }
}
