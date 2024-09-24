using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class PackageImage
    {
        public int Id { get; set; }
        [ForeignKey("Package")]
        public int PackageId { get; set; }
        public string ImagePath { get; set; }
        [JsonIgnore]
        public Package Package { get; set; }
    }
}
