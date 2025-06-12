import React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? (typeof window !== "undefined" ? window.location.origin : "");
  const verificationUrl = `${baseUrl}/api/auth/verify?code=${code}`;

  return (
    <div>
      <h2>Код подтверждения: {code}</h2>
      <p>
        Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить вашу регистрацию:
        <br />
        <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
          {verificationUrl}
        </a>
      </p>
      <p>Если ссылка не работает, скопируйте и вставьте её в адресную строку вашего браузера.</p>
      <p>
        С уважением, <br />
        Ваша Компания Next-Pizza
      </p>
    </div>
  );
};
