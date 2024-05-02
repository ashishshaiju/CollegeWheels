'use server'

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

export async function navigateStart() {
  redirect(`/start`);
}