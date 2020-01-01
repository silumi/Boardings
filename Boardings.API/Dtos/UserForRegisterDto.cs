using System.ComponentModel.DataAnnotations;

namespace Boardings.API.Dtos{
    public class UserForRegisterDto{
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage="You must enter a password length between 4 & 8")]
        public string Password { get; set; }
    }
}