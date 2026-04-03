using ChromebookBooking.Api.Domain.Common.Exceptions;

namespace ChromebookBooking.Api.Domain.Entities;

public class Cabinet
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public bool IsActive { get; private set; }

    public Cabinet(string name)
    {
        ValidateName(name);
        Name = name;
        IsActive = true;
    }

    public void Deactivate()
    {
        IsActive = false;
    }

    public void Activate()
    {
        IsActive = true;
    }

    public void UpdateName(string newName)
    {
        ValidateName(newName);
        Name = newName;
    }

    private static void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new DomainException("Nome do gabinete não pode ser nulo ou vazio");
        }
    }
}
