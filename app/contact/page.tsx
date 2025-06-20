import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-4">
        Have a question, suggestion, or just want to say hello? We'd love to hear from you!
        Please fill out the form below or reach out to us using the contact information provided.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="Enter your email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter subject" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" rows={6} />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Information</h2>
          <div className="space-y-4 text-lg">
            <p>
              <strong>Address:</strong> 123 Theatre Lane, Arts City, Europe
            </p>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p>
              <strong>Email:</strong> info@actingeurope.com
            </p>
            <p>
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (CET)
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-600 hover:underline">Facebook</a>
            <a href="#" className="text-blue-400 hover:underline">Twitter</a>
            <a href="#" className="text-pink-600 hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;