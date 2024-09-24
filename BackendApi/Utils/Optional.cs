public class RazorpaySettings
{
    public string KeyId { get; set; }
    public string KeySecret { get; set; }
}

public class EmailSettings
{
    public string SmtpServer { get; set; }
    public int SmtpPort { get; set; }
    public string SmtpUsername { get; set; }
    public string SmtpPassword { get; set; }
}
