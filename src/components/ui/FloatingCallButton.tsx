// RUTA: src/components/ui/FloatingCallButton.tsx (ACTUALIZADO CON MODAL)
'use client';

import { useState, useEffect } from 'react';
import { Phone, X, Mail, CalendarPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { Locale } from '@/i18n.config'; // Necesario para lang

// Props que el componente espera recibir
type FloatingCallButtonProps = {
    lang: Locale;
    phoneNumber: string;
    email: string;
};

export default function FloatingCallButton({ lang, phoneNumber, email }: FloatingCallButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Determinar si es móvil en el cliente
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768); // 768px es el breakpoint 'md' de Tailwind
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const telLink = `tel:+1${phoneNumber.replace(/\D/g, '')}`;
    const mailtoLink = `mailto:${email}`;
    const bookingLink = `/${lang}/agendar-visita`;

    const handleClick = () => {
        if (isMobile) {
            window.location.href = telLink; // Acción en móvil: llamar
        } else {
            setIsModalOpen(true); // Acción en desktop: abrir modal
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Textos (puedes moverlos al diccionario si lo prefieres)
    const modalTitle = lang === 'es' ? 'Información de Contacto' : 'Contact Information';
    const bookButtonText = lang === 'es' ? 'Agendar Estimación Online' : 'Book Estimate Online';

    return (
        <>
            {/* Botón Flotante Principal */}
            <button
                onClick={handleClick}
                className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors flex items-center justify-center"
                aria-label={isMobile ? `Call ${phoneNumber}` : "Open Contact Info"}
            >
                <Phone className="h-6 w-6" />
            </button>

            {/* Modal y Overlay (Solo para Desktop) */}
            <AnimatePresence>
                {!isMobile && isModalOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal} // Cerrar al hacer clic en el overlay
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                            aria-hidden="true"
                        />

                        {/* Contenido del Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md text-soft-black"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="contact-modal-title"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 id="contact-modal-title" className="text-2xl font-semibold font-serif text-primary">
                                    {modalTitle}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-soft-black transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Teléfono */}
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                    <a href={telLink} className="text-lg hover:text-primary transition-colors">
                                        {phoneNumber}
                                    </a>
                                </div>
                                {/* Correo */}
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                                    <a href={mailtoLink} className="text-lg hover:text-primary transition-colors break-all">
                                        {email}
                                    </a>
                                </div>
                                {/* Botón Agendar Visita */}
                                <div className="pt-4">
                                    <Link
                                        href={bookingLink}
                                        onClick={closeModal} // Cerrar modal al navegar
                                        className="inline-flex w-full items-center justify-center rounded-md text-base font-medium transition-colors bg-primary text-white shadow hover:bg-primary-hover h-11 px-6"
                                    >
                                        <CalendarPlus className="h-5 w-5 mr-2" />
                                        {bookButtonText}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}