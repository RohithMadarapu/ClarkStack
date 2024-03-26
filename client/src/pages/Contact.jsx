import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <div class="contact-container">
      <h2 className="contact-h2">Contact Information</h2>
      <label for="email">Email:</label>
      <a href="mailto:grad@clarku.edu">grad@clarku.edu</a>

      <p className="contact-p">Phone: (123) 456-7890</p>

      <h2 className="contact-h2">Frequently Asked Questions</h2>

      <h3 className="contact-h3">How can I register for an event?</h3>
      <p className="contact-p">
        To register for an event, visit the event's page and look for the
        registration section. Fill out the required information and click the
        "Register" or "RSVP" button. You may need to log in or create an account
        to complete the registration process.
      </p>

      <h3 className="contact-h3">What information do I need to provide during event registration?</h3>
      <p className="contact-p">
        Typically, event registration will require your name, email address, and
        sometimes additional details such as student ID or department
        information. Make sure to provide accurate and complete information to
        secure your spot.
      </p>

      <h3 className="contact-h3">Can I register for multiple events at once?</h3>
      <p className="contact-p">
        Yes, you can register for multiple events. Simply go to the registration
        pages of the events you're interested in and follow the registration
        process for each event individually.
      </p>

      <h3 className="contact-h3">Is there a deadline for event registration?</h3>
      <p className="contact-p">
        Event registration deadlines vary by event. Some events may have
        registration open until the event date, while others may have limited
        spots and close registration early. Be sure to check the event details
        for registration deadlines.
      </p>

      <h3 className="contact-h3">Can I cancel my registration if I can't attend an event?</h3>
      <p className="contact-p">
        Yes, if you find that you can't attend an event after registering, you
        can often cancel your registration through the event's registration
        page. This allows others to take your spot if the event has limited
        capacity.
      </p>

      <h3 className="contact-h3">Is there a fee for event registration?</h3>
      <p className="contact-p">
        The event registration fee, if any, varies by event. Some events may be
        free, while others may require a fee for attendance. Check the event
        details for information on registration fees.
      </p>

      <h3 className="contact-h3">Do I need to bring a printed ticket to the event?</h3>
      <p className="contact-p">
        Some events may require a printed ticket for entry, while others may
        accept digital tickets or just your registration confirmation. Check the
        event details to see if a printed ticket is necessary.
      </p>

      <h3 className="contact-h3">
        What should I do if I encounter issues during the registration process?
      </h3>
      <p className="contact-p">
        If you encounter technical issues or have questions during the
        registration process, please contact our support team using the provided
        contact information. They will assist you with any registration
        problems.
      </p>
      <h3 className="contact-h3">
        What should I do if I encounter issues during the registration process?
      </h3>
      <p className="contact-p">
        If you encounter technical issues or have questions during the
        registration process, please contact our support team using the provided
        contact information. They will assist you with any registration
        problems.
      </p>

      <p className="contact-p">
        Any Other Queries
        <a href="contact.html" class="get-in-touch-button">Get in Touch</a> with
        our experts.
      </p>
    </div>
  )

}

export default Contact
