using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
             opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
             .ForMember(dest => dest.Age, opt => opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<User,UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
             opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
             .ForMember(dest => dest.Age, opt => opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}