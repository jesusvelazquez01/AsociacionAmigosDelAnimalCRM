'use client';

import { sendGAEvent } from '@next/third-parties/google';

// ─── Tipos de eventos ────────────────────────────────────────────────────────

type FilterAppliedEvent = {
  filter_type: 'especie' | 'genero' | 'tamaño';
  filter_value: string;
};

type PetSearchedEvent = {
  search_term: string;
};

type PetCardClickedEvent = {
  pet_name: string;
  pet_type: string;
  pet_id: number;
};

type PaginationUsedEvent = {
  page_number: number;
};

type DonationClickedEvent = {
  amount: string;
  method: 'mercadopago' | 'paypal' | 'transferencia';
};

type AliasCopiedEvent = {
  field: 'alias' | 'cbu' | 'paypal';
};

type ContactFormSubmittedEvent = {
  subject: string;
};

type ContactFormErrorEvent = {
  error_message: string;
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAnalytics() {
  // /adopcion
  const trackFilterApplied = (data: FilterAppliedEvent) => {
    sendGAEvent('event', 'filter_applied', data);
  };

  const trackPetSearched = (data: PetSearchedEvent) => {
    if (!data.search_term.trim()) return;
    sendGAEvent('event', 'pet_searched', data);
  };

  const trackPetCardClicked = (data: PetCardClickedEvent) => {
    sendGAEvent('event', 'pet_card_clicked', data);
  };

  const trackPaginationUsed = (data: PaginationUsedEvent) => {
    sendGAEvent('event', 'pagination_used', data);
  };

  // /donar
  const trackDonationClicked = (data: DonationClickedEvent) => {
    sendGAEvent('event', 'donation_clicked', data);
  };

  const trackAliasCopied = (data: AliasCopiedEvent) => {
    sendGAEvent('event', 'alias_copied', data);
  };

  const trackSponsorClicked = () => {
    sendGAEvent('event', 'sponsor_clicked', {});
  };

  // /contacto
  const trackContactFormSubmitted = (data: ContactFormSubmittedEvent) => {
    sendGAEvent('event', 'contact_form_submitted', data);
  };

  const trackContactFormError = (data: ContactFormErrorEvent) => {
    sendGAEvent('event', 'contact_form_error', data);
  };

  const trackWhatsappUrgentClicked = () => {
    sendGAEvent('event', 'whatsapp_urgent_clicked', {});
  };

  const trackContactFromAdoption = () => {
    sendGAEvent('event', 'contact_from_adoption', {});
  };

  const trackVolunteerClicked = () => {
    sendGAEvent('event', 'volunteer_clicked', {});
  };

  return {
    // adopcion
    trackFilterApplied,
    trackPetSearched,
    trackPetCardClicked,
    trackPaginationUsed,
    trackContactFromAdoption,
    // donar
    trackDonationClicked,
    trackAliasCopied,
    trackSponsorClicked,
    // contacto
    trackContactFormSubmitted,
    trackContactFormError,
    trackWhatsappUrgentClicked,
    // voluntarios
    trackVolunteerClicked,
  };
}
