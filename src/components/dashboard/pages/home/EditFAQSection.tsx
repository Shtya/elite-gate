import { useFieldArray, Control } from "react-hook-form";
import TextInput from "@/components/shared/Forms/TextInput";
import TextareaInput from "@/components/shared/Forms/TextareaInput";
import EditFAQCard from "./EditFAQCard";
import { useState } from "react";
import { HomeContentForm } from "./HomeForm";


type EditFAQSectionProps = {
    control: Control<HomeContentForm>;
};

export default function EditFAQSection({ control }: EditFAQSectionProps) {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "faqs",
    });

    // local draft for add/edit
    const [draftQuestion, setDraftQuestion] = useState("");
    const [draftAnswer, setDraftAnswer] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleSave = () => {
        if (!draftQuestion.trim() || !draftAnswer.trim()) return;

        if (editIndex !== null) {
            update(editIndex, { question: draftQuestion, answer: draftAnswer });
            setEditIndex(null);
        } else {
            append({ question: draftQuestion, answer: draftAnswer });
        }

        // clear draft
        setDraftQuestion("");
        setDraftAnswer("");
    };

    function handleOnRemove(index: number) {

        remove(index)
        if (index == editIndex) {

            setEditIndex(null)
            // clear draft
            setDraftQuestion("");
            setDraftAnswer("");
        }
    }

    return (
        <>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 my-1">
                أضف سؤال
            </h3>
            {/* Draft inputs */}
            <div className="space-y-3 mb-4">
                <TextInput
                    id="faq-question"
                    name="faq-question"
                    label="السؤال"
                    placeholder="أدخل السؤال"
                    value={draftQuestion}
                    onChange={(e) => setDraftQuestion(e.target.value)}
                />
                <TextareaInput
                    id="faq-answer"
                    name="faq-answer"
                    label="الإجابة"
                    placeholder="أدخل الإجابة"
                    value={draftAnswer}
                    onChange={(e) => setDraftAnswer(e.target.value)}
                />

                <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]"
                    onClick={handleSave}
                >
                    {editIndex !== null ? "تحديث السؤال" : "إضافة سؤال"}
                </button>
            </div>

            {/* List of FAQ cards */}
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <EditFAQCard
                        key={field.id}
                        question={field.question}
                        answer={field.answer}
                        isEdited={index === editIndex}
                        onEdit={() => {
                            setDraftQuestion(field.question);
                            setDraftAnswer(field.answer);
                            setEditIndex(index);
                        }}
                        onRemove={() => handleOnRemove(index)}
                    />
                ))}
            </div>
        </>
    );
}
