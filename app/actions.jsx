"use server"
import { redirect } from 'next/navigation'

export async function navigateHome() {
  redirect(`/`);
}

export async function navigateDriver() {
  redirect(`/driver`);
}

export async function navigateLogin() {
  redirect(`/login`);
}

export async function navigateLoginDriver() {
  redirect(`/driver/login`);
}

export async function navigateStartKuttikkanam() {
  redirect(`/start/kuttikkanam`);
}

export async function navigateStartPallikunnu() {
  redirect(`/start/pallikunnu`);
}

export async function navigateRegister() {
  redirect(`/register`);
}

