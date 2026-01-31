from rag_template.rag_retriever import get_template
from rag_template.rag_generator import generate_report


def main():
    print("\nDescribe what happened:\n")
    incident_text = input("> ")

    print("\nSelect complaint type:\n")
    print("1. Cybercrime Complaint")
    print("2. FIR Narrative")
    print("3. Platform Report\n")

    choice = input("Enter choice (1/2/3): ").strip()

    type_map = {
        "1": "cybercrime",
        "2": "fir",
        "3": "platform"
    }

    complaint_type = type_map.get(choice)
    if not complaint_type:
        print("Invalid choice.")
        return

    template = get_template(complaint_type)
    report = generate_report(template, incident_text)

    print("\n========== COPY & PASTE BELOW ==========\n")
    print(report)
    print("\n========== END ==========\n")


if __name__ == "__main__":
    main()
