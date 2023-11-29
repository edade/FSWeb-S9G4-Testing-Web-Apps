import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {

    render(<IletisimFormu/>)
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>)
    const header = screen.getByText("İletişim Formu");
    expect(header).toBeInTheDocument();

});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const name = screen.getByLabelText("Ad*");
    fireEvent.change(name, { target: { value: "Eda" } });
    const error = screen.getByTestId("error");
    expect(error).toHaveTextContent("Hata: ad en az 5 karakter olmalıdır.");
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const submitBtn = screen.getByRole("button", { name: "Gönder" });
    expect(submitBtn).toHaveTextContent("Gönder");
    fireEvent.click(submitBtn);
    const errors = screen.getAllByTestId("error");
    expect(errors).toHaveLength(3);

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>)
    const name = screen.getByLabelText("Ad*");
    fireEvent.change(name, { target: { value: "Edaki" } });

    const surname = screen.getByPlaceholderText("Mansız");
    fireEvent.change(surname, { target: { value: "Kalayci" } });

    const submitBtn = screen.getByText("Gönder");
    fireEvent.click(submitBtn);

    const error = screen.getByTestId("error");
    expect(error).toHaveTextContent(
      "Hata: email geçerli bir email adresi olmalıdır."
    );


});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    const mail = screen.getByLabelText("Email*")
    fireEvent.change(mail, {target: {value: "eda"}})
    const error = screen.getByTestId("error")
    expect(error).toHaveTextContent("Hata: email geçerli bir email adresi olmalıdır.")

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

});
